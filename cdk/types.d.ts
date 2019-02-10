import * as iam from '@aws-cdk/aws-iam'

export interface ICoreInfrastructureOptions {
  /**
   * If true, prevents a router from being created
   *
   * @default false
   */
  disableRouter?: boolean
}

export interface ICustomRoles {
  /**
   * IAM Role that provides basic permissions necessary for AWS CodeBuild to
   * function
   */
  codeBuildBaseRole: iam.Role
}
