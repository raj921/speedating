import  { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is VideoMatch.date?",
    answer: "Videomatch.date is a revolutionary platform inspired by speed dating concept but with a twist. Every day of the week, at same time and day, themed events are scheduled online catering to different demographic, religion, lifestyle and much more. Every participant will upload a 3 minutes video introduction of themselves, what they are seeking for and what is their hobbies, interests and ambitions. Participant will purchase tickets for events that match their interest and will watch intro videos of all available participant of opposite gender located in their vicinity. Once they select Red heart for any of the participant, our complex matching algorithm will put in contact each participant and will allow the ladies to create and send a Google meet link to their matches of opposite genders. This way, the ladies decide to move forward with a live video call."
  },
  {
    question: "How to purchase tickets?",
    answer: "You can purchase tickets directly on our website by selecting your desired event and following the checkout process."
  },
  {
    question: "How can I contact my matches?",
    answer: "Once you select Red ❤️❤️ for any participant, as long as they select you as well, then a match is created on our system. The lady will then be prompted to create a Google meet link to send to their matches and conduct a virtual video call. All participants have up until 11:59pm of that same evening to watch all videos of all participants of their selected events. So don't be rushed, take your time. Once 12am bell rings, all videos of all participants will no longer appear on your dashboard. Make sure to watch them before all videos disappear."
  },
  {
    question: "How long do events last?",
    answer: "Based on the calendar, each event is around 1 hour, however, you can watch videos of all participants up until 11:59pm of the day of the event you signed up for. All ladies will be prompted to create a Google meet link to their matches within that same evening. You can ONLY signup to events on that same day. All registrations start at 12am until a few minutes prior to start of events."
  },
  {
    question: "Can I purchase tickets for events for the next week?",
    answer: "No, all tickets are purchased for that same evening. Every Mondays, we have religious events, where you can only purchase tickets for the evening events. You have up to 1 minute prior to start of event to get ticket for that event. Once the event starts, all registrations are closed for that specific event. You will have to wait for the week after to sign up for that same event."
  },
  {
    question: "How many people can I meet?",
    answer: "Based on your location and time zone, we will only show you singles in your local state of residence. All events are based on geolocation and time zone. It is divided between East, Central, Mountain and Pacific time for events and states for geolocation. If you are in South Carolina, you will only see people residing in the same state. We are trying to narrow it down to same city to make it easier for people to meet. If you enter a room and no one appears in your Geo location, it can mean that no one from South Carolina signed up and you can sort the event by opening it up to time zone instead of geolocation. More results will appear in the room."
  },
  {
    question: "What about male to female ratio?",
    answer: "We will put a limit to how many can signup from each gender but we can't control how many of each gender will signup. Either way, you will get the chance to watch the videos and determine who you would like to meet again. Unlike a traditional online speed dating event, you are set to talk to everyone in the main room but in our platform, you will be able to preselect who you want to meet based on the video introduction of the participant. Based on a recent poll, many have found it to be a brilliant twist with online speed dating. Ladies are the ones who will decide to send a Google meet link to the opposite gender based on their selected matches."
  },
  {
    question: "What is considered a match and when should I expect a Google meet link for live video call?",
    answer: "A match is when both man and woman select Red Heart ❤️ to each other. Once a match is recorded by our system, both participants will receive notification on their dashboard that a match is available. The ladies are suggested to create a Google meet link to their match so they can conduct a virtual video call. You can then decide to exchange contact information with each other and eventually get to meet. I would keep the video calls at around 9 minutes, especially if you have other recorded matches for that event. If there is only one match, you can talk all you want and get to know each other."
  },
  {
    question: "If I meet no one at the event, do I get a voucher based on your 100% guarantee?",
    answer: "That is correct. Our guarantee offers at least one match at every event. A voucher code will be generated for you to use for the next event of your choice to enter FREE of charge."
  },
  {
    question: "How can I increase my chances to meet people at events?",
    answer: "When you enter a room, I would suggest to sort by: Time zone events, instead of Geo location, as it is possible that some participant from your state of residence may not register for the specific event you attended. It is always important to sort the attendees room based on time zone. You can always start with geolocation, but ultimately consider time zone sort criteria."
  },
  {
    question: "If I don't login at the event designated time, will I lose opportunity to watch videos?",
    answer: "No, all participant's videos for the event you purchased will appear on your dashboard up to 11:59pm of that same evening. If you fail to login by that time, all videos will eventually disappear and no refunds are offered."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-brand-gradient-soft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about VideoMatch events
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}