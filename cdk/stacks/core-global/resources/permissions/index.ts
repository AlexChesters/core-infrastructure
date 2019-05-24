import * as s3 from '@aws-cdk/aws-s3'
import * as cdk from '@aws-cdk/cdk'

import codeBuildPolicy from './policies/codebuild-base-policy'
import codeBuildRole from './roles/codebuild-base-role'

import codePipelineCloudFormationRole from './roles/codepipeline-cloudformation-role'

import codePipelinePolicy from './policies/codepipeline-base-policy'
import codePipelineRole from './roles/codepipeline-execution-role'

import { ICustomRoles } from '../../../../types'

export default (parent: cdk.Construct, buildArtifactsBucket: s3.Bucket): ICustomRoles => {
  const codeBuildBaseRole = codeBuildRole(parent)
  const codePipelineBaseRole = codePipelineRole(parent)
  return {
    codeBuildBasePolicy: codeBuildPolicy(
      parent,
      buildArtifactsBucket,
      codeBuildBaseRole
    ),
    codeBuildBaseRole,
    codePipelineBasePolicy: codePipelinePolicy(
      parent,
      buildArtifactsBucket,
      codePipelineBaseRole
    ),
    codePipelineBaseRole,
    codePipelineCloudFormationRole: codePipelineCloudFormationRole(
      parent,
      codePipelineBaseRole
    )
  }
}
