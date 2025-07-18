import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser()

  // parallel data fetching
  const [userInterviews, allInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })
  ])


  const hasPastInterviews = userInterviews?.length > 0
  const hasUpcomingInterviews = allInterviews?.length > 0

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg ">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>

          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven't taken any interviews yet.</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
