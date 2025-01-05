export const BookingBlock = ({ content }: { content: any }) => {
  if (!content) {
    return '';
  }

  return `
    <section class="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-8">${content.heading || "Book Studio Time"}</h2>
        <p class="text-center text-white/60 mb-16">${content.description || "Schedule your next session with me"}</p>
        
        ${content.showCalendar ? `
          <div class="bg-white/5 p-8 rounded-xl border border-white/10">
            <div class="grid grid-cols-7 gap-2 mb-4">
              ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `
                <div class="text-center text-sm font-medium text-white/60">${day}</div>
              `).join('')}
            </div>
            <div class="grid grid-cols-7 gap-2">
              ${Array(35).fill(null).map((_, i) => `
                <button class="aspect-square flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
                  <span class="text-sm">${i + 1}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="mt-8 text-center">
          <button class="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Request Booking
          </button>
        </div>
      </div>
    </section>
  `;
};