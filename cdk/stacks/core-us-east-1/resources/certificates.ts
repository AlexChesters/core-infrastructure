import * as acm from '@aws-cdk/aws-certificatemanager'
import * as cdk from '@aws-cdk/core'

import { IUsEast1Certificates } from '../../../types'

export default (parent: cdk.Construct): IUsEast1Certificates => {
  return {
    alexChestersProjectsCertificate: new acm.Certificate(parent, 'AlexChestersProjectsCertificate', {
      domainName: '*.projects.alexchesters.com',
      subjectAlternativeNames: ['*.test.projects.alexchesters.com'],
      validationMethod: acm.ValidationMethod.DNS
    })
  }
}
