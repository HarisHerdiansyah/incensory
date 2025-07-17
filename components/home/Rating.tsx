'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitRating } from '@/actions/rating';
import { toast } from 'react-toastify';

export default function Rating() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const response = await submitRating(rating, feedback);
    if (response.success) {
      setIsExpanded(false);
      setRating(0);
      setFeedback('');
      setHoveredRating(0);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className='rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300'
          size='icon'
        >
          <MessageCircle strokeWidth={3} className='h-6 w-6' />
        </Button>
      ) : (
        <Card className='w-72 shadow-xl border-0 animate-in slide-in-from-bottom-2 duration-300'>
          <CardHeader className=''>
            <div className='flex items-center justify-between'>
              {isSubmitted ? (
                <div>
                  <CardTitle className='text-lg'>
                    Terima Kasih!
                  </CardTitle>
                  <CardDescription className='text-sm'>
                    Semua penilaian membantu kami lebih baik lagi.
                  </CardDescription>
                </div>
              ) : (
                <div>
                  <CardTitle className='text-lg'>
                    Rating Platform Kami!
                  </CardTitle>
                  <CardDescription className='text-sm'>
                    Masukan Anda membantu kami meningkatkan layanan.
                  </CardDescription>
                </div>
              )}
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsExpanded(false)}
                className='h-8 w-8'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            {!isSubmitted && (
              <>
                <div className='space-y-2'>
                  <p className='text-sm font-medium'>
                    Bagaimana pengalaman Anda menggunakan platform ini?
                  </p>
                  <div className='flex gap-1'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={handleStarLeave}
                        className='transition-colors duration-150'
                      >
                        <Star
                          className={cn(
                            'h-6 w-6 transition-colors',
                            hoveredRating >= star || rating >= star
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-400'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className='space-y-2'>
                  <p className='text-sm font-medium'>
                    Beri tahu lebih lanjut (optional)
                  </p>
                  <Textarea
                    placeholder='Bagikan pemikiran, saran, atau laporkan masalah...'
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className='min-h-[80px] resize-none'
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className='w-full'
                >
                  <Send className='h-4 w-4 mr-2' />
                  Kirim Penilaian
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
