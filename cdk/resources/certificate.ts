import * as acm from '@aws-cdk/aws-certificatemanager'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct): acm.CfnCertificate => {
  return new acm.CfnCertificate(parent, 'AlexChestersDotComWildcard', {
    domainName: '*.alexchesters.com',
    validationMethod: 'DNS'
  })
}
