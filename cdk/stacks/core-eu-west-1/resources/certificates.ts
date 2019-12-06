import * as acm from '@aws-cdk/aws-certificatemanager'
import * as cdk from '@aws-cdk/core'

import { ICertificates } from '../../../types'

export default (parent: cdk.Construct): ICertificates => {
  return {
    alexChestersApiCertificate: new acm.Certificate(parent, 'AlexChestersAPICertificate', {
      domainName: '*.api.alexchesters.com',
      validationMethod: acm.ValidationMethod.DNS
    })
  }
}
