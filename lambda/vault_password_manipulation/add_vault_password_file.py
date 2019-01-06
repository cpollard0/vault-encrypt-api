""" vault password file manipulation
    vault password files are stored in parameter store in the path /ansible/vault_passwords/{{ application name }}/{{ vault_password_env }}
    This patterns gives us the ability to store pinops/_nonprd, as an example

 """
from __future__ import print_function
import logging
import json
import boto3
from botocore.exceptions import ClientError
from botocore.vendored import requests


LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)
DEBUG_MODE = True
if DEBUG_MODE:
    LOGGER.setLevel(logging.DEBUG)

SSM_CLIENT = boto3.client('ssm')
SSM_BASE_PATH = "/ansible/vault_passwords/"
""" limitations on parameter names
A parameter name must be unique within an AWS Region
A parameter name can't be prefixed with "aws" or "ssm" (case-insensitive).
Parameter names can include only the following symbols and letters: a-zA-Z0-9_.-/
A parameter name can't include spaces.
"""

def create_vault_password(application_name, vault_password_env, vault_password):
    """ create an ansible vault password """
    print (SSM_BASE_PATH + application_name + "/" + vault_password_env )
    response = SSM_CLIENT.put_parameter(
        Name=SSM_BASE_PATH + application_name + "/" + vault_password_env,
        Description='Vault password for ' + application_name + ' for env ' + vault_password_env,
        Value=vault_password,
        Type='SecureString',
        # TODO: Add in KMS CMK; can specify CMK based on access; i.e. read only vs power?
        #KeyId='string',
    )
    print (response)
    return

def lambda_handler(event, context):
    """Main Lambda function."""
    LOGGER.debug(event)
    LOGGER.debug(context)
    action = event['action']
    if action == 'create':
        print ("Create a vault password")
        create_vault_password(event['application_name'], event['vault_password_env'], event['vault_password'])

def main():
  print("Main")
  # create_vault_password("chris_test_app", "nonprd", "blahbalalkdsajfals;jf")
  create_vault_password("chris_test_app", "preprd", "asdfteaeawt")
  create_vault_password("chris_test_app", "prd", "asdfteaeawt")

if __name__== "__main__":
  main()