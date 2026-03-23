import { Pose, YogaClass, Trainer, BlogPost } from './types';

export const POSES: Pose[] = [
  {
    id: '1',
    name: 'Mountain Pose',
    sanskritName: 'Tadasana',
    description: 'The foundation of all standing poses, Mountain Pose improves posture and balance.',
    benefits: ['Improves posture', 'Strengthens thighs', 'Reduces flat feet'],
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Standing'
  },
  {
    id: '2',
    name: 'Downward-Facing Dog',
    sanskritName: 'Adho Mukha Svanasana',
    description: 'One of the most widely recognized yoga poses, it stretches the entire body.',
    benefits: ['Energizes the body', 'Stretches shoulders', 'Strengthens arms'],
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Inversion'
  },
  {
    id: '3',
    name: 'Warrior II',
    sanskritName: 'Virabhadrasana II',
    description: 'A powerful standing pose that builds strength and focus.',
    benefits: ['Strengthens legs', 'Opens hips', 'Improves stamina'],
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Standing'
  },
  {
    id: '4',
    name: 'Tree Pose',
    sanskritName: 'Vrksasana',
    description: 'A balancing pose that helps improve focus and concentration.',
    benefits: ['Improves balance', 'Strengthens ankles', 'Calms the mind'],
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Balance'
  },
  {
    id: '5',
    name: 'Crow Pose',
    sanskritName: 'Bakasana',
    description: 'An arm balance that requires core strength and focus.',
    benefits: ['Strengthens wrists', 'Tones core', 'Improves balance'],
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Arm Balance'
  },
  {
    id: '6',
    name: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    description: 'A gentle backbend that stretches the chest and strengthens the spine.',
    benefits: ['Strengthens spine', 'Stretches chest', 'Relieves stress'],
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Backbend'
  },
  {
    id: '7',
    name: "Child's Pose",
    sanskritName: 'Balasana',
    description: 'A resting pose that gently stretches the hips, thighs, and ankles.',
    benefits: ['Calms the brain', 'Relieves back pain', 'Stretches hips'],
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Restorative'
  },
  {
    id: '8',
    name: 'Plank Pose',
    sanskritName: 'Phalakasana',
    description: 'A foundational core-strengthening pose that builds full-body stability.',
    benefits: ['Strengthens core', 'Tones arms', 'Improves posture'],
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Core'
  },
  {
    id: '9',
    name: 'Triangle Pose',
    sanskritName: 'Trikonasana',
    description: 'A standing pose that stretches the legs and opens the chest.',
    benefits: ['Stretches hamstrings', 'Improves digestion', 'Relieves backache'],
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Standing'
  },
  {
    id: '10',
    name: 'Bridge Pose',
    sanskritName: 'Setu Bandhasana',
    description: 'A backbend that opens the heart and strengthens the legs.',
    benefits: ['Stretches chest', 'Calms the mind', 'Improves circulation'],
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1562085034-8e1781899b0c?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Backbend'
  },
  {
    id: '11',
    name: 'Pigeon Pose',
    sanskritName: 'Eka Pada Rajakapotasana',
    description: 'A deep hip opener that releases tension and improves flexibility.',
    benefits: ['Opens hips', 'Stretches glutes', 'Relieves lower back pain'],
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1552196564-977a44d03067?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Hip Opener'
  },
  {
    id: '12',
    name: 'Boat Pose',
    sanskritName: 'Navasana',
    description: 'A seated balance that builds intense core strength and stability.',
    benefits: ['Strengthens core', 'Improves balance', 'Tones hip flexors'],
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1599447292180-45fd882c82f9?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Core'
  },
  {
    id: '13',
    name: 'Seated Forward Bend',
    sanskritName: 'Paschimottanasana',
    description: 'A calming seated stretch for the entire back body.',
    benefits: ['Stretches hamstrings', 'Calms the mind', 'Improves digestion'],
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Seated'
  },
  {
    id: '14',
    name: 'Half Lord of the Fishes',
    sanskritName: 'Ardha Matsyendrasana',
    description: 'A seated twist that improves spinal mobility and detoxifies.',
    benefits: ['Spinal flexibility', 'Stimulates organs', 'Relieves neck pain'],
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1588282322603-4e1b7c7a443f?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Twist'
  },
  {
    id: '15',
    name: 'Camel Pose',
    sanskritName: 'Ustrasana',
    description: 'A deep backbend that opens the entire front of the body.',
    benefits: ['Opens chest', 'Strengthens back', 'Improves posture'],
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/3o7TKMGpxx8A6pS2xG.gif',
    category: 'Backbend'
  },
  {
    id: '16',
    name: 'Headstand',
    sanskritName: 'Sirsasana',
    description: 'The "King of Poses," an inversion that builds strength and focus.',
    benefits: ['Improves circulation', 'Strengthens core', 'Calms the brain'],
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    animation: 'https://i.giphy.com/l0MYK0S9ccK59Lh6M.gif',
    category: 'Inversion'
  }
];

export const CLASSES: YogaClass[] = [
  {
    id: '1',
    title: 'Morning Flow for Beginners',
    instructor: 'Sarah Jenkins',
    duration: '30 min',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    category: 'Vinyasa',
    description: 'A gentle flow to wake up your body and mind.'
  },
  {
    id: '2',
    title: 'Power Yoga Intensive',
    instructor: 'David Chen',
    duration: '60 min',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&q=80&w=800',
    category: 'Power',
    description: 'High-intensity session focused on strength and endurance.'
  },
  {
    id: '3',
    title: 'Mindful Hatha',
    instructor: 'Elena Rodriguez',
    duration: '45 min',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800',
    category: 'Hatha',
    description: 'Focus on alignment and breath in this balanced session.'
  },
  {
    id: '4',
    title: 'Restorative Yin Yoga',
    instructor: 'Elena Rodriguez',
    duration: '75 min',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    category: 'Yin',
    description: 'Deep stretching and relaxation for long-held poses.'
  },
  {
    id: '5',
    title: 'Core Strength Vinyasa',
    instructor: 'David Chen',
    duration: '45 min',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&q=80&w=800',
    category: 'Vinyasa',
    description: 'Build heat and core stability with this dynamic flow.'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Lead Instructor',
    bio: 'With over 10 years of experience, Sarah specializes in Vinyasa and Yin yoga.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400',
    certifications: ['RYT 500', 'Yoga Therapy Certified'],
    experience: '12 years'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Power Yoga Specialist',
    bio: 'David brings athletic intensity to traditional yoga practices.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    certifications: ['RYT 200', 'Personal Training L3'],
    experience: '8 years'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Hatha & Yin Expert',
    bio: 'Elena focuses on the meditative aspects of yoga and proper alignment.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    certifications: ['RYT 500', 'Meditation Teacher'],
    experience: '10 years'
  },
  {
    id: '4',
    name: 'Marcus Thorne',
    role: 'Ashtanga Master',
    bio: 'Marcus teaches the traditional Ashtanga primary series with precision.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    certifications: ['KPJAYI Authorized', 'RYT 500'],
    experience: '15 years'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Tips for Better Morning Yoga',
    excerpt: 'Start your day right with these simple adjustments to your practice.',
    content: 'Morning yoga can transform your entire day...',
    author: 'Sarah Jenkins',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    category: 'Tips'
  },
  {
    id: '2',
    title: 'Understanding Breathwork',
    excerpt: 'Pranayama is the heart of yoga. Learn how to master your breath.',
    content: 'Breath is the bridge between the body and mind...',
    author: 'Elena Rodriguez',
    date: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    category: 'Mindfulness'
  },
  {
    id: '3',
    title: 'Yoga for Better Sleep',
    excerpt: 'Calm your nervous system before bed with these restorative poses.',
    content: 'Quality sleep is essential for recovery and mental clarity...',
    author: 'Sarah Jenkins',
    date: 'March 18, 2024',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    category: 'Wellness'
  },
  {
    id: '4',
    title: 'The Power of Consistency',
    excerpt: 'Why showing up on your mat every day matters more than you think.',
    content: 'Consistency is the key to unlocking the true benefits of yoga...',
    author: 'David Chen',
    date: 'March 20, 2024',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800',
    category: 'Motivation'
  },
  {
    id: '5',
    title: 'Yoga for Desk Workers',
    excerpt: 'Relieve neck and shoulder tension from sitting all day.',
    content: 'Sitting at a desk for 8 hours can wreak havoc on your posture...',
    author: 'Elena Rodriguez',
    date: 'March 22, 2024',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800',
    category: 'Wellness'
  },
  {
    id: '6',
    title: 'The Benefits of Yin Yoga',
    excerpt: 'Why slowing down is just as important as building heat.',
    content: 'Yin yoga targets the deep connective tissues of the body...',
    author: 'Elena Rodriguez',
    date: 'March 25, 2024',
    image: 'https://images.unsplash.com/photo-1552196564-977a44d03067?auto=format&fit=crop&q=80&w=800',
    category: 'Education'
  },
  {
    id: '7',
    title: 'Mindful Eating and Yoga',
    excerpt: 'How your practice on the mat extends to your plate.',
    content: 'Yoga is not just about movement; it is about awareness...',
    author: 'Sarah Jenkins',
    date: 'March 28, 2024',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17051?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle'
  },
  {
    id: '8',
    title: 'Yoga for Runners: Pre and Post-Run Flows',
    excerpt: 'Optimize your performance and prevent injury with these targeted stretches.',
    content: 'Running is a high-impact activity that can lead to tight hamstrings and hips...',
    author: 'David Chen',
    date: 'April 2, 2024',
    image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&q=80&w=800',
    category: 'Athletes'
  },
  {
    id: '9',
    title: 'The Science of Meditation: How it Changes Your Brain',
    excerpt: 'Explore the neurological benefits of a consistent mindfulness practice.',
    content: 'Recent studies have shown that meditation can physically alter the brain...',
    author: 'Elena Rodriguez',
    date: 'April 5, 2024',
    image: 'https://images.unsplash.com/photo-1528319725582-ddc0a3a35665?auto=format&fit=crop&q=80&w=800',
    category: 'Science'
  },
  {
    id: '10',
    title: 'Creating Your Sacred Space: A Guide to Home Yoga Studios',
    excerpt: 'Turn any corner of your home into a peaceful sanctuary for your practice.',
    content: 'You dont need a massive studio to have a powerful home practice...',
    author: 'Sarah Jenkins',
    date: 'April 8, 2024',
    image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle'
  },
  {
    id: '11',
    title: 'Decoding Yoga Styles: Which One is Right for You?',
    excerpt: 'From Vinyasa to Ashtanga, find the perfect match for your goals.',
    content: 'With so many styles of yoga available, it can be overwhelming to choose...',
    author: 'Marcus Thorne',
    date: 'April 12, 2024',
    image: 'https://images.unsplash.com/photo-1588282322603-4e1b7c7a443f?auto=format&fit=crop&q=80&w=800',
    category: 'Education'
  },
  {
    id: '12',
    title: 'Overcoming the Ego on the Mat',
    excerpt: 'Learning to listen to your body instead of your competitive mind.',
    content: 'Yoga is a practice of self-discovery, not self-comparison...',
    author: 'Elena Rodriguez',
    date: 'April 15, 2024',
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?auto=format&fit=crop&q=80&w=800',
    category: 'Mindfulness'
  }
];
