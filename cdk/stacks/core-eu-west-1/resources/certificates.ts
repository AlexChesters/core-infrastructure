import * as acm from '@aws-cdk/aws-certificatemanager'
import * as cdk from '@aws-cdk/core'

import { IEuWest1Certificates } from '../../../types'

export default (parent: cdk.Construct): IEuWest1Certificates => {
  return {
    alexChestersApiCertificate: new acm.Certificate(parent, 'AlexChestersAPICertificate', {
      domainName: '*.api.alexchesters.com',
      validationMethod: acm.ValidationMethod.DNS
    })
  }
}
