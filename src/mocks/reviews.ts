export type TReview = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}

export const reviews: TReview[] = [
  {
    id: '1',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'test comment',
    rating: 2
  },
  {
    id: '2',
    date: '2021-04-12T15:11:56.569Z',
    user: {
      name: 'keksobot',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'Meow-meow?',
    rating: 4
  }
];
