# Ansible Vault API

## What problem am I solving?

Vault password files are important secrets that we don't want to distribute too broadly. As an example,
the production database connection is a vault encrypted secret that can be unlocked with the
appropriate vault password file.

We also want a wide group of folks to be able to use these vault password files to encrypt secrets when building automation.
It decreases velocity when developers need to wait on an operations team member to vault encrypt a secret.

The goal of this repo is to provide an API into vault passwords where they can be used without being known.

## How am I solving it?

There will be two primary functions:

1. The ability to store vault secrets in the parameter store. This takes care of the pesky "storing secrets in a spreadsheet problem".
2. The ability to leverage those vault secrets to encrypt a string without knowing the vault secret. This takes care of the
issue impedement of needing someone else to encrypt your secret (even if you own the secret...inefficient, right?).

It will start out as two lambdas - one for manipulating the vault passwords and one for encrypting secrets.

It will grow into a full fledged API to do these functions.

Over time, I want to build an angular app using amplify that leverages these APIs to provide a nice GUI into the tool. Or
add it to ITMS.