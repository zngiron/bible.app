'use client';

import type { ReactNode } from 'react';

import { motion } from 'motion/react';

function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="size-full"
    >
      {children}
    </motion.div>
  );
}

export default Template;
