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

SECRETS_MANAGER_CLIENT = boto3.client('secretsmanager')
SSM_BASE_PATH = "/ansible/vault_passwords/"
""" limitations on parameter names
A parameter name must be unique within an AWS Region
A parameter name can't be prefixed with "aws" or "ssm" (case-insensitive).
Parameter names can include only the following symbols and letters: a-zA-Z0-9_.-/
A parameter name can't include spaces.
"""

def create_vault_password(application_name, vault_password_env, vault_password):
    """ creates or updates an ansible vault password """
    # TODO: Add logic to see if new/old differ; saving on unnecessary versions
    LOGGER.debug(SSM_BASE_PATH + application_name + "/" + vault_password_env )
    create_new = False
    try:
        current_secret_value = SECRETS_MANAGER_CLIENT.get_secret_value(
            SecretId=application_name
        )
        json_current_secret = json.loads(current_secret_value['SecretString'])
        json_current_secret[vault_password_env] = vault_password
        response = SECRETS_MANAGER_CLIENT.update_secret(
            SecretId=application_name,
            SecretString=json.dumps(json_current_secret),
        )
        LOGGER.info("Secret updated")
    # if ResourceNotFoundException we're fine; we need to create the secret
    except ClientError as err:
        if err.response['Error']['Code'] == 'ResourceNotFoundException':
            create_new = True
            pass
        else:
            LOGGER.error(err)
    if create_new:
        response = SECRETS_MANAGER_CLIENT.create_secret(
            Name=application_name,
            Description= application_name + " vault password files",
            #ClientRequestToken='string',
            # SecretBinary=b'bytes',
            SecretString='{"' +  vault_password_env + '":"' + vault_password + '"}',Tags=[
                {
                    'Key': 'app',
                    'Value': 'ansible-vault'
                },
            ]
            # VersionStages=[
            #     'string',
            # ]
        )
        LOGGER.info("Secret added")
        LOGGER.debug(response)
    return

def delete_secret(application_name, vault_password_env):
    """ deletes ansible vault passwords stored in secret manager"""
    LOGGER.debug("Begin delete secret")
    response = SECRETS_MANAGER_CLIENT.delete_secret(
        SecretId=application
    )
    LOGGER.debug("End delete secret")
    return

def generate_secret():
    """ generates a random string """
    LOGGER.debug("Begin generate random string")
    response = SECRETS_MANAGER_CLIENT.get_random_password(
        PasswordLength=32,
        # ExcludeCharacters='string',
        # ExcludeNumbers=True|False,
        ExcludePunctuation=True,
        # ExcludeUppercase=True|False,
        # ExcludeLowercase=True|False,
        IncludeSpace=False,
        # RequireEachIncludedType=True|False
    )
    LOGGER.debug(response)
    LOGGER.debug("End generate random string")
    return response['RandomPassword'].encode('utf-8')

def lambda_handler(event, context):
    """Main Lambda function."""
    LOGGER.debug(event)
    LOGGER.debug(context)
    eventBody = json.loads(event['body'])
    # TODO: Add validate input function
    if event['httpMethod']== "POST" or event['httpMethod']== "PUT" :
        for env in eventBody['vault_password_env']:
            LOGGER.debug("Create a vault password")
            if 'vault_password' not in eventBody:
                vault_password = generate_secret()
            else:
                vault_password = eventBody['vault_password']
            create_vault_password(eventBody['application_name'], env, vault_password)
    elif event['httpMethod'] == "GET":
        LOGGER.debug(event['pathParameters'])
    elif event['httpMethod']== "DELETE" :
        delete_vault_password(eventBody['application_name'], eventBody['vault_password_env'])
    # TODO: Actually don't make this crappy
    outcome = {
        "isBase64Encoded": 'false',
        "statusCode": 200,
        "body": "done"
    }
    return outcome


def main():
    print("Main")
    # create_vault_password("chris_test_app", "nonprd", "blahbalalkdsajfals;jf")

    event = {
        'httpMethod': 'post',
        'body': json.dumps({"application_name":"chris_new_app4", "vault_password_env":["sbx","foo", "bar"]})
    }
    lambda_handler(event, "")

if __name__== "__main__":
    main()