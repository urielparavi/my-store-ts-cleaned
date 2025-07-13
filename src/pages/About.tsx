import { Heart } from 'lucide-react';

function About() {
  return (
    <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 text-gray-900 dark:text-gray-100 fade-in">
      <h1 className="flex flex-wrap gap-3 sm:gap-x-8 items-center justify-center text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
        We believe in
        <span className="bg-black/80 py-2 px-6 rounded-lg tracking-widest text-white shadow-lg select-none transform transition-transform hover:scale-105">
          COZY
        </span>
      </h1>

      <p className="mt-10 max-w-4xl mx-auto text-lg leading-relaxed tracking-wide text-gray-700 dark:text-gray-300">
        Our dedicated team is passionate about crafting apparel that combines
        ultimate comfort with timeless style. We are committed to delivering
        premium quality products that empower you to feel confident and relaxed,
        wherever life takes you.{' '}
        <span className="text-orange-600 underline">
          Learn more about our story
        </span>
        . <br />
        <span className="inline-flex items-center gap-2 text-orange-600 font-semibold">
          <Heart size={20} className="animate-pulse text-orange-600" />
          Every stitch is made with love and attention to detail.
        </span>{' '}
        At the heart of everything we do lies one core value — making comfort
        stylish and accessible for all. <br />
        Join us on this journey to embrace fashion that feels as good as it
        looks.
      </p>

      <div className="mt-14 flex flex-wrap justify-center gap-6">
        {[
          {
            emoji: '✨',
            title: 'Quality Materials',
            desc: 'We source the finest fabrics for unmatched softness and durability.',
          },
          {
            emoji: '🌿',
            title: 'Eco-Friendly',
            desc: 'Sustainable production practices to protect our planet.',
          },
          {
            emoji: '💡',
            title: 'Innovative Design',
            desc: 'Combining modern aesthetics with ultimate functionality.',
          },
        ].map(({ emoji, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg max-w-xs w-full hover:shadow-xl transition-shadow cursor-default"
          >
            <div className="text-4xl mb-3 animate-bounce text-orange-500">
              {emoji}
            </div>
            <h3 className="font-bold text-xl mb-1 text-orange-700 dark:text-orange-500">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
