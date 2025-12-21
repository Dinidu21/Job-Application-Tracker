/**
 * Enhanced smooth scrolling utilities
 * Provides better control over scroll behavior with easing functions
 */

/**
 * Easing function for smooth scroll animation
 * @param t - Current time (0 to 1)
 * @returns Eased value
 */
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Smooth scroll to element with enhanced easing
 * @param element - Target element to scroll to
 * @param offset - Offset from top (default: 80px for navbar)
 * @param duration - Animation duration in ms (default: 800ms)
 */
export const smoothScrollToElement = (
  element: Element,
  offset: number = 80,
  duration: number = 800
): void => {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeProgress = easeInOutCubic(progress);
    const currentPosition = startPosition + distance * easeProgress;

    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Smooth scroll to element by selector
 * @param selector - CSS selector for target element
 * @param offset - Offset from top (default: 80px for navbar)
 * @param duration - Animation duration in ms (default: 800ms)
 */
export const smoothScrollTo = (
  selector: string,
  offset: number = 80,
  duration: number = 800
): void => {
  const element = document.querySelector(selector);
  if (element) {
    smoothScrollToElement(element, offset, duration);
  }
};

/**
 * Enhanced scroll handler for anchor links
 * Automatically handles smooth scrolling for all anchor links
 */
export const initializeSmoothScrolling = (): void => {
  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement;
    const href = target.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        smoothScrollToElement(element, 80, 800);
      }
    }
  };

  // Add event listeners to all anchor links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');

    if (anchor) {
      handleAnchorClick(e);
    }
  });
};

/**
 * Scroll to top with smooth animation
 * @param duration - Animation duration in ms (default: 600ms)
 */
export const scrollToTop = (duration: number = 600): void => {
  const startPosition = window.pageYOffset;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeProgress = easeInOutCubic(progress);
    const currentPosition = startPosition * (1 - easeProgress);

    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Check if element is in viewport
 * @param element - Element to check
 * @param threshold - Threshold for visibility (default: 0)
 * @returns Boolean indicating if element is visible
 */
export const isElementInViewport = (element: Element, threshold: number = 0): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
  );
};