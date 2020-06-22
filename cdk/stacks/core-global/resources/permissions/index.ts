import * as cdk from '@aws-cdk/core'

import codeBuildPolicy from './policies/codebuild-base-policy'
import codeBuildRole from './roles/codebuild-base-role'

import codePipelineCloudFormationRole from './roles/codepipeline-cloudformation-role'

import codePipelinePolicy from './policies/codepipeline-base-policy'
import codePipelineRole from './roles/codepipeline-execution-role'

import packerPolicy from './policies/packer-policy'

import githubActionsUser from './users/github-actions-user'

import { ICustomPermissions } from '../../../../types'

export default (parent: cdk.Construct, buildArtifactsBucket: string[]): ICustomPermissions => {
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
    ),
    packerPolicy: packerPolicy(parent),
    githubActionsUser: githubActionsUser(parent)
  }
}
