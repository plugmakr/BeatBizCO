export const LicensingBlock = ({ content }: { content: any }) => {
  const licenses = content?.licenses || [
    {
      name: "Basic License",
      price: "$29.99",
      features: ["MP3 File", "5000 Streams", "Non-Profit Use"]
    },
    {
      name: "Premium License",
      price: "$99.99",
      features: ["WAV File", "Unlimited Streams", "Commercial Use"]
    },
    {
      name: "Exclusive Rights",
      price: "$499.99",
      features: ["All Files", "Full Ownership", "Unlimited Use"]
    }
  ];

  return `
    <section class="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">Licensing Options</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${licenses
            .map(
              (license: any) => `
            <div class="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <h3 class="text-xl font-semibold text-white mb-3">${license.name}</h3>
              <p class="text-primary font-bold mb-6">${license.price}</p>
              <ul class="space-y-3">
                ${license.features
                  .map(
                    (feature: string) => `
                  <li class="flex items-center text-white/70">
                    <svg class="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ${feature}
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
};