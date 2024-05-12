import { GetObjectAclCommandInput, S3Client } from "@aws-sdk/client-s3"
import { DeleteObjectCommand, DeleteObjectCommandInput, GetObjectCommand } from '@aws-sdk/client-s3';


export const S3 = new S3Client({
  endpoint: process.env.ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
})

export const getObject = async (key: string) => {
  const params: GetObjectAclCommandInput = {
    Bucket: process.env.AWS_SECRET_BUCKET_NAME as string,
    Key: key
  }
  try {
    const command = new GetObjectCommand(params)
    const response = await S3.send(command)
    return `https://ipfs.filebase.io/ipfs/${response.Metadata?.cid}`
  } catch (error) {
    return error
  }
}

export const deleteObject = async (key: string) => {
  const params: DeleteObjectCommandInput = {
    Bucket: process.env.AWS_SECRET_BUCKET_NAME as string,
    Key: key
  }
  const command = new DeleteObjectCommand(params)
  await S3.send(command).then((data) => {
    return !!data

  }).catch((err) => {
    return !!err
  })
}