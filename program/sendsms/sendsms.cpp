#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <argp.h>
#include <unistd.h>
#include "include/libfetion.h"

#define MAX_LOGIN 5
#define MAX_SEND  20

/* Version, contact, user defined doc, argument doc strings for argp.h. */
const char *argp_program_version = "sendsms 0.1";
const char *argp_program_bug_address = "<solrex@gmail.com>";
static char doc[] = "Example:\n  sendsms -f SENDER -p PASSWD -t fetion1,\
fetion2 Hello!\nOptions:";
static char args_doc[] = "MESSAGE";

/* Program options we understand. */
static struct argp_option options[] = {
  {"from",   'f',   "SENDER",    0, "The sender's fetion/phone number" },
  {"passwd", 'p',   "PASSWD",    0, "The sender's password" },
  {"to",     't',"RECEIVERS",    0, 
   "The receivers' fetion numbers, split by ','" },
  {"verbose",'v',          0,    0, "Print verbose information" },
  { 0 }
};
 
/* Used by |main| to communicate with |parse_opt|. */
typedef struct _args {
  char *from;       /* Sender's phone/fetion number string pointer. */
  char *passwd;     /* Sender's password string pointer. */
  char *to;         /* Receiver's phone/fetion number string pointer. */
  char *message;    /* SMS message body pointer. */
  BOOL  verbose;
} ARGUMENTS;

/* Parse a single option. */
static error_t
parse_opt (int key, char *arg, struct argp_state *state)
{
  /* Get the input argument from |argp_parse|, which we know is a pointer to
   * our |ARGUMENTS| structure. */
  ARGUMENTS *p_args = (ARGUMENTS *)state->input;
  /* Parse option key. */
  switch (key) {
    case 'f':
      p_args->from = arg;
    break;
    case 'p':
      p_args->passwd = arg;
    break;
    case 't':
      p_args->to = arg;
    break;
    case 'v':
      p_args->verbose = TRUE;
    break;
    case ARGP_KEY_ARG:   /* We have only one(none-option) argument: MESSAGE. */
      if (state->arg_num > 1)   
        argp_usage (state);
      p_args->message = arg;
    break;
    case ARGP_KEY_NO_ARGS:      /* The MESSAGE argument can not be ignored. */
      argp_usage (state);
    break;
    case ARGP_KEY_END:
      if (state->arg_num < 1)   /* The MESSAGE argument can not be ignored. */
        argp_usage(state);
    break;

    default:
      return ARGP_ERR_UNKNOWN;
  }
  return 0;
}

/* |argp| structure used by |argp_parse| function. */
static struct argp p_argp = {options, parse_opt, args_doc, doc};

int main(int argc, char** argv)
{
  ARGUMENTS args;
  PROXY_ITEM proxy;
  char *proxyenv = NULL, *p, *q;
  int ret, i;
  long int uid;

  /* Default option values. */
#if 0
  args.from = "136xxxxxxxx";
  args.passwd = "*********";
#endif
  args.to = NULL;
  args.verbose = FALSE;

  /* Parse our arguments; every option seen by |parse_opt| will be reflected
   * in |args|. */
  argp_parse (&p_argp, argc, argv, 0, 0, &args);

  ret = strlen(args.message);
  if ((ret<1) || (ret>160)) {
    fprintf(stderr, "FAIL: Argument MESSAGE is too long or too short.\n");
    return 1;
  }
  ret = strlen(args.from);
  if ((ret!=9) && (ret!=11)) {
    fprintf(stderr, "FAIL: Option value SENDER has wrong bits.\n");
    return 1;
  }
  if (args.to != NULL) {
    ret = strlen(args.to);
    if (ret<9) {
      fprintf(stderr, "FAIL: Option value RECEIVER has wrong bits.\n");
      return 1;
    }
  }

  if (!fx_init()) {                         /* Init libfetion. */
    fprintf(stderr, "FAIL: init().\n");
    return 1;
  } else if (args.verbose == TRUE) {
    fprintf(stderr, "PASS: init().\n");
  }

  /* Read environment variable "http_proxy". */
  if (proxyenv = getenv("http_proxy")) {
    proxyenv = strdup(proxyenv);
    if (strncmp(proxyenv, "http://", 7) == 0) {
      if (p = strchr(proxyenv, '@')) {
        *p = '\0';
        proxy.host = p + 1;
        proxy.name = proxyenv + 7;
        if (p = strchr(proxy.name, ':')) {
          *p = '\0';
          proxy.pwd = p + 1;
        }
      } else {
        proxy.host = proxyenv + 7;
        proxy.name = NULL;
        proxy.pwd = NULL;
      }
      if (p = strchr(proxy.host, ':')) {
        *p = '\0';
        proxy.port = p + 1;
      }
      proxy.type = PROXY_HTTP;
      /* Set http proxy. */
      fx_set_proxy(&proxy);
    }
  }

  fx_set_login_status(FX_STATUS_OFFLINE);   /* Set status offline. */
  for (i=1; i<=MAX_LOGIN; i++) {
    ret = fs_login(args.from, args.passwd);
    if (ret) break;
    else sleep(1);
  }
  i>MAX_LOGIN ? i-- : i ;
  if (!ret) {
    fprintf(stderr, "FAIL: %s login() after %d tries.\n", args.from, i);
    return 2;
  } else if (args.verbose == TRUE) {
    fprintf(stderr, "PASS: %s login() after %d tries.\n", args.from, i);
  }
  /* If "-t" option is ignored, send the MESSAGE to the SENDER-self. */
  if (args.to == NULL) {
    args.to = args.from;
    for (i=1; i<=MAX_SEND; i++) {
      ret = fs_send_sms_to_self(args.message);
      if (ret) break;
      else sleep(1);
    }
  } else {
    /* If "-t" option is a mobile phone number, use API: 
     * |fs_send_sms_by_mobile_no|. */
    /* FIXME!/Wenbo-20081028: It doesn't work with libfetion 0.81. Maybe a
     * bug exsits, so we can only use fetion num as the value of RECEIVER. */
    p = strdup(args.to);
    q = strchr(p, ',');
    while (p != NULL) {
      if (q != NULL)    *q = '\0';
      if (strncmp(p, "13", 2) == 0) {
        for (i=1; i<=MAX_SEND; i++) {
          ret = fs_send_sms_by_mobile_no(p, args.message);
          if (ret) break;
          else sleep(1);
        }
      } else {
        /* If "-t" option is a fetion number, use API: |fs_send_sms|. */
        uid = strtol(p, NULL, 10);
        for (i=1; i<=MAX_SEND; i++) {
          ret = fs_send_sms(uid, args.message);
          if (ret) break;
          else sleep(1);
        }
      }
      i>MAX_SEND ? i-- : i ;
      if (!ret) {
        fprintf(stderr, "FAIL: send_sms() from %s to %s after %d tries.\n",
                args.from, p, i);
        return 3; 
      } else if (args.verbose == TRUE) {
        fprintf(stderr, "PASS: send_sms() from %s to %s after %d tries.\n",
                args.from, p, i);
      }
      if (q != NULL) {
        p = q+1;
        q = strchr(p, ',');
      } else {
        p = NULL;
      }
    }
  }
  /* Logout, disconnect and release resources. */
  fx_loginout();
  fx_close_network();
  /* NOTE!/Wenbo-20081031: The fetion doc is wrong. terminate after logout
   * will cause a CAN-NOT TERMINATE error. */
  //fx_terminate();
  if (args.verbose == TRUE) {
    fprintf(stderr, "PASS: terminate().\n");
  }
  return 0;
}