import React, { Suspense, lazy } from 'react';
import Navbar from '../commonComponents/Navbar';
import Footer from '../commonComponents/Footer';
import SkeletonLoader from '../../components/skeletonLoader/SkeletonLoader';

const HeroBanner = lazy(() => import('./HeroBanner'));
const PersonalizedResources = lazy(() => import('./PersonalizedResources'));
const PersonalizedOpportunities = lazy(() => import('./PersonalizedOpportunities'));
const EventCollection = lazy(() => import('./EventCollection'));
const DailyTips = lazy(() => import('./DailyTips'));

// Import the new skeleton loader

const Homepage = () => {
  return (
    <div>
      <Navbar />

      <Suspense fallback={<SkeletonLoader />}>
        <HeroBanner />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <PersonalizedResources />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <PersonalizedOpportunities />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <EventCollection />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <DailyTips />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Homepage;


