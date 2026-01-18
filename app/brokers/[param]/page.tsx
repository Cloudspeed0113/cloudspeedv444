import { notFound } from "next/navigation"
import { getBrokerByParam, getAllBrokerParams } from "@/data/broker-details"
import { BrokerProfileClient } from "@/components/brokers/broker-profile-client"

interface Props {
  params: Promise<{ param: string }>
}

export default async function BrokerProfilePage({ params }: Props) {
  const { param } = await params
  const broker = getBrokerByParam(param)

  if (!broker) {
    notFound()
  }

  return <BrokerProfileClient broker={broker} />
}

export async function generateStaticParams() {
  return getAllBrokerParams()
}

export const dynamicParams = true
