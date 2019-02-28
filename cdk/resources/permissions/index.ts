import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

import codeBuildRole from './roles/codebuild-base-role'
import codePipelineCloudFormationRole from './roles/codepipeline-cloudformation-role'
import codePipelineRole from './roles/codepipeline-execution-role'

import { ICustomRoles } from '../../types'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket): ICustomRoles => {
  const codePipelineBaseRole = codePipelineRole(parent, buildArtifactsBucket)
  return {
    codeBuildBaseRole: codeBuildRole(parent, buildArtifactsBucket),
    codePipelineBaseRole,
    codePipelineCloudFormationRole: codePipelineCloudFormationRole(
      parent,
      codePipelineBaseRole
    )
  }
}
