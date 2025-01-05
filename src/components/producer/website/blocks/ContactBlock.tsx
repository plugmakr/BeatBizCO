export const ContactBlock = ({ content }: { content: any }) => {
  if (!content || !content.fields) {
    return '';
  }

  return `
    <section class="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">${content.heading || "Get in Touch"}</h2>
        <form class="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
          ${content.fields.includes('name') ? `
            <div>
              <label class="block text-sm font-medium mb-2">Name</label>
              <input type="text" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Your name">
            </div>
          ` : ''}
          ${content.fields.includes('email') ? `
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input type="email" class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="your@email.com">
            </div>
          ` : ''}
          ${content.fields.includes('message') ? `
            <div>
              <label class="block text-sm font-medium mb-2">Message</label>
              <textarea class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white h-32" placeholder="Your message"></textarea>
            </div>
          ` : ''}
          <button type="submit" class="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  `;
};