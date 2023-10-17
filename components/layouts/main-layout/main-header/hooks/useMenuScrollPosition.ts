import { useScroll } from 'framer-motion';

export const useMenuScrollPosition = (
  menuRef: React.RefObject<HTMLElement>
) => {
  const { scrollYProgress } = useScroll({
    target: menuRef,
    offset: [
      `0px ${menuRef.current?.getBoundingClientRect().top || 0}px`,
      `end ${menuRef.current?.getBoundingClientRect().top || 0}px`,
    ],
  });

  return scrollYProgress;
};
