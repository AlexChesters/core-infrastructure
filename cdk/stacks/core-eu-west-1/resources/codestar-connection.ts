import * as cdk from '@aws-cdk/core'
import * as codestarconnections from '@aws-cdk/aws-codestarconnections'

export default (parent: cdk.Construct): codestarconnections.CfnConnection => {
  return new codestarconnections.CfnConnection(parent, 'GitHubConnection', {
    connectionName: 'github-connection',
    providerType: 'GitHub'
  })
}
