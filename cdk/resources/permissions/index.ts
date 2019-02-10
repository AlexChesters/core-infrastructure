import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

import codeBuildRole from './roles/codebuild'
import codePipelineRole from './roles/codepipeline'

import { ICustomRoles } from '../../types'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket): ICustomRoles => {
  return {
    codeBuildBaseRole: codeBuildRole(parent, buildArtifactsBucket),
    codePipelineBaseRole: codePipelineRole(parent, buildArtifactsBucket)
  }
}
