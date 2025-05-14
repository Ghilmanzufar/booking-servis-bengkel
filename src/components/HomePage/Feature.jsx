import React from 'react';

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
            </svg>
        ),
        title: 'Tanpa Antri',
        description: "Booking kapan saja tanpa antri.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-cog" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="7" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h1" />
                <path d="M19.4 15a1.6 1.6 0 0 0 0 3" />
                <path d="M17.2 17.2l.6 .6" />
                <path d="M21 17.2l-.6 .6" />
            </svg>
        ),
        title: 'Teknisi Profesional',
        description: "Servis oleh mekanik berpengalaman",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-discount" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 15l6 -6" />
                <circle cx="9.5" cy="9.5" r=".5" fill="currentColor" />
                <circle cx="14.5" cy="14.5" r=".5" fill="currentColor" />
                <path d="M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2z" />
            </svg>
        ),
        title: 'Harga Terjangkau',
        description: "Harga terjangkau harga pelajar",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
            </svg>
        ),
        title: 'Layanan Cepat',
        description: "Layanan cepat dan tepat tanpa menunggu lama.",
    }
];

    const FeatureSection = () => {
    return (
        <div className="bg-black">
        <section id="features" className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30">
            <div className="relative mx-auto max-w-5xl text-center">
            <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
                Kenapa Anda Memilih Kami?
            </span>
            <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
                Benefit dan Keunggalan Yang Akan Anda Dapat
            </h2>
            </div>

            <div className="relative z-10 mx-auto my-2 max-w-7xl grid grid-cols-1 gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
                <div key={index} className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
                <div
                    className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
                    style={{
                    backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)',
                    borderColor: 'rgb(93, 79, 240)',
                    }}
                >
                    {feature.icon}
                </div>
                <h3 className="mt-6 text-gray-400">{feature.title}</h3>
                <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                    {feature.description}
                </p>
                </div>
            ))}
            </div>

            <div
            className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
            style={{
                backgroundImage:
                'linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)',
                borderColor: 'rgba(92, 79, 240, 0.2)',
            }}
            ></div>
            <div
            className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
            style={{
                backgroundImage:
                'linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)',
                borderColor: 'rgba(92, 79, 240, 0.2)',
            }}
            ></div>
        </section>
        </div>
    );
};

export default FeatureSection;
