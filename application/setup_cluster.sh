if [ -n "${AWS_MASTER+set}" ]; then
  k3sup install --ip $AWS_MASTER --user $AWS_USER --ssh-key $AWS_PEM_PATH
  export KUBECONFIG=$PWD/kubeconfig # export path to current directory
  kubectl config set-context default

  if [ -n "${AWS_WORKER1+set}" ]; then
    k3sup join --ip $AWS_WORKER1 --server-ip $AWS_MASTER --user $AWS_USER --ssh-key $AWS_PEM_PATH
  fi

  if [ -n "${AWS_WORKER2+set}" ]; then
    k3sup join --ip $AWS_WORKER2 --server-ip $AWS_MASTER --user $AWS_USER --ssh-key $AWS_PEM_PATH
  fi
else
  echo "You didn't set up system variables, execute '. init_vars.sh' first"
fi