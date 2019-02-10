import * as acm from '@aws-cdk/aws-certificatemanager'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2'
import * as cdk from '@aws-cdk/cdk'

export default (parent: cdk.Construct, vpc: ec2.VpcNetwork, certificate: acm.CfnCertificate) => {
  const securityGroup = new ec2.SecurityGroup(parent, 'SecurityGroup', {
    allowAllOutbound: true,
    vpc
  })

  securityGroup.addIngressRule(
    new ec2.AnyIPv4(),
    new ec2.TcpPort(443)
  )

  const lb = new elbv2.ApplicationLoadBalancer(parent, 'LoadBalancer', {
    internetFacing: true,
    securityGroup,
    vpc
  })

  new elbv2.CfnListener(parent, 'HTTPSListener', {
    certificates: [
      {
        certificateArn: certificate.certificateArn
      }
    ],
    defaultActions: [
      {
        fixedResponseConfig: {
          statusCode: '200'
        },
        type: 'fixed-response'
      }
    ],
    loadBalancerArn: lb.loadBalancerArn,
    port: 443,
    protocol: 'HTTPS'
  })
}
