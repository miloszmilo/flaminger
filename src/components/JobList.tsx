"use client"
import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'
import { OfferWithCompanyInfo, UserApplications } from '@/app/lib/definitions';
import SkeletonJobOffer from './placeholders/SkeletonJobOffer';

type Props = {
  isNotLoggedIn: boolean
}

export default function JobList({ isNotLoggedIn }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<OfferWithCompanyInfo[]>();

  function getStatus(applicationStatus: Partial<UserApplications>) {
    if (applicationStatus.isAccepted) return "accepted";
    if (!applicationStatus.isApplicationInProgress && !applicationStatus.isAccepted) return "rejected";
    if (applicationStatus.isApplied && applicationStatus.isApplicationInProgress) return "in progress";
    return "new";
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchOffers = async () => {
      await fetch('/api/offers')
        .then(async (res) => {
          const responseJson = await res.json();
          setOffers(responseJson.offers);
          setIsLoading(false);
        })
    }
    fetchOffers();
  }, [])

  return (
    <ul className="flex flex-col gap-4 px-4">
      {isLoading &&
        <>
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
        </>
      }
      {offers && offers!.map((offerFullInfo: OfferWithCompanyInfo) => {
        const offer = offerFullInfo.jobsTable;
        const company = offerFullInfo.companiesTable;
        let status;
        let applicationStatus;
        if (offerFullInfo.jobsToUsersTable) {
          applicationStatus = offerFullInfo.jobsToUsersTable;
          status = applicationStatus.jobId === offer.id ? getStatus(applicationStatus) : "new";
        }
        return (
          <li key={offer.id}>
            <JobOffer
              id={offer.id}
              title={offer.title}
              description={offer.description}
              logoPath={`/companies/logos/small/${company.name.toLowerCase()}.jpg`}
              company={company.name}
              acceptanceRate={company.acceptanceRate}
              requirements={[]}
              status={status ?? "new"}
              isNotLoggedIn={isNotLoggedIn}
            />
          </li>
        )
      })}
    </ul>
  )
}
