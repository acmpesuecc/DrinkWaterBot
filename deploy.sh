#!/bin/bash
echo $super_secret_password | gpg --passphrase-fd 0 id_rsa.pem.gpg
eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 id_rsa.pem # Allow read access to the private key
ssh-add id_rsa.pem # Add the private key to SSH
ssh-keyscan dwb2.westus2.cloudapp.azure.com >> $HOME/.ssh/known_hosts
git config --global push.default matching
git remote add deploy ssh://git@dwb2.westus2.cloudapp.azure.com:/home/git/dwb.git
git push deploy master
