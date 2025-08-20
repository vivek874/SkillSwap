import type { FC } from 'react';

const SkillRequests: FC = () => {
  return (
    <section className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Skill Requests</h2>
      <p className="text-gray-600">You have no new skill requests at the moment.</p>
    </section>
  );
};

export default SkillRequests;
