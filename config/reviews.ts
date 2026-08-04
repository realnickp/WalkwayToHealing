// Five-star Google reviews of Walkway to Healing, quoted verbatim from the
// public Google Business Profile listing. Shown in the homepage review carousel.

export const googleRating = {
  value: 4.8,
  count: 51,
}

export const googleReviewsUrl =
  'https://www.google.com/maps/search/?api=1&query=Walkway+to+Healing+1200+Light+St+Baltimore+MD'

export interface GoogleReview {
  author: string
  text: string
}

export const googleReviews: GoogleReview[] = [
  {
    author: 'Jae Ded',
    text: "Walkway is such an amazing place and they treat everyone like family. They truly care about everyone that walks in the door and will do whatever it takes to help them. I've personally seen so many people's lives change in such a positive way after going through their program.",
  },
  {
    author: 'Jeremy Rennie',
    text: 'Walkway to healing was an excellent program to help me get on my feet and was there for me through an incredibly hard time through the death of my fiance and showed me means and ways to cope with my emotions and feelings and become a stronger individual and a much more confident person that I had forgot that I was.',
  },
  {
    author: 'Adam Geppi',
    text: 'Walkway To Healing has been the best program that I have been to out of 20 other programs. The staff is very respectable and experienced. The approach to treatment is amazing.',
  },
  {
    author: 'Brandon Lipscomb',
    text: "Amazing place. Amazing staff. Actually feel like I'm getting somewhere in my journey to recovery every since I came here. The staff checks in with you regularly and makes sure you have everything you need to be comfortable so that you can actually focus on getting clean",
  },
  {
    author: 'Kelli Cox',
    text: "This place is absolutely amazing! If it wasn't for here I wouldn't know where i would be, this place treats people with empathy and compassion and now a days that is rare to come by.",
  },
  {
    author: 'Sidney Phillips',
    text: 'Walkway to healing is one of if the best treatment centers I’ve ever been they treat you with dignity and they really care about you feelings and your recovery. And I would and will definitely refer other people to walkway to healing.',
  },
  {
    author: 'Jade Eve Dufour',
    text: 'This place saved my life honestly without it I would’ve never been able to get clean without this place and the techs here are so amazing and down to earth, they genuinely care about the clients that go through here and it genuinely shows.',
  },
  {
    author: 'Bryan Wersten',
    text: 'Walk way to healing is a very clean and professional business. If you are struggling with addiction, I would highly recommend walk way too healing. The staff is very professional. This program saved my life',
  },
  {
    author: 'Justin Conley',
    text: "When I needed help walkway to healing was there for me. I'm still clean today because of the love and compassion they showed towards me.",
  },
  {
    author: 'Kevin Sikes',
    text: "It's a great program with staff who actually care walkway saved my life",
  },
]
