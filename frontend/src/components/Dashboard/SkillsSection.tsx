

import type { FC } from 'react';

const SkillsSection: FC = () => {
  return (
    <section className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Skills</h2>
      <p className="text-gray-600">You haven't added any skills yet.</p>
    </section>
  );
};

export default SkillsSection;