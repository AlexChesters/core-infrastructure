import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

import codebuildRole from './codebuild'

import { ICustomRoles } from '../../types'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket): ICustomRoles => {
  return { codeBuildBaseRole: codebuildRole(parent, buildArtifactsBucket) }
}
