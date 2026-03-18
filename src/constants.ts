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
    category: 'Arm Balance'
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
  }
];
