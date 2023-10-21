'use client';

import { gsap } from 'gsap';
import { useLayoutEffect } from 'react';
import { animationClasses, animationIds } from '@/lib/constants';

export function AboutBehindCurtainAnimation() {
  useLayoutEffect(() => {
    const gsapContext = gsap.context(() => {
      // Finish a bit above the top of the screen because we want the about
      // section a be a bit more pinned as we keep scrolling down
      const extraScroll = 30;

      // Reveal the about section behind a 'curtain' which seems to be pulled in
      // front of it
      gsap.to(`.${animationClasses.homeCurtainToPull}`, {
        top: `-1${extraScroll}vh`,
        scrollTrigger: {
          // Trigger when the previous element reaches the bottom of the screen
          trigger: `*:has(+#${animationIds.homeAboutSection})`,
          start: 'bottom bottom',
          end: `bottom -${extraScroll}%`,
          pin: `#${animationIds.homeAboutSection}`,
          scrub: true,
          // The docs seem to imply that this should be true by default, but it
          // doesn't seem to be the case
          pinSpacing: true,
        },
      });
    });

    return () => gsapContext.revert(); // <- Cleanup!
  }, []);

  return <></>;
}
