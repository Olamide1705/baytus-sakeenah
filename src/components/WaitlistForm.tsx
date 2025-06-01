import React, { useState } from 'react';
import { FormData, Role } from '../types';
import { validateForm, handleFormSubmit } from '../utils/formUtils';

const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '' as Role,
    interest: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await handleFormSubmit(formData);
      if (success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', role: '' as Role, interest: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="waitlist" className="py-20 hero-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-teal-900/10 p-8 md:p-12">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
              Join Our Community
            </h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6 animate-float">✨</div>
                <h3 className="text-2xl font-semibold gradient-text mb-4">
                  Jazak Allah Khair for joining!
                </h3>
                <p className="text-teal-800/80 mb-8">
                  We've added you to our waitlist. We'll notify you as soon as our platform launches, In sha Allah.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="button-primary"
                >
                  Join Again for Someone Else
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-teal-900 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'border-red-500' : 'border-teal-200'}`}
                    placeholder="Abdullah"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-teal-900 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'border-red-500' : 'border-teal-200'}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-teal-900 font-medium mb-2">
                    Your Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`form-input text-teal-900 ${errors.role ? 'border-red-500' : 'border-teal-200'}`}
                  >
                    <option value="">Select your role</option>
                    <option value="mentor">Community Elder/Scholar</option>
                    <option value="couple">Married Couple</option>
                    <option value="single">Preparing for Marriage</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-red-600 text-sm">{errors.role}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-teal-900 font-medium mb-2">
                    What aspects of Islamic marriage would you like to learn more about? (Optional)
                  </label>
                  <textarea
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Share your thoughts..."
                  ></textarea>
                </div>
                
                {errors.submit && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    {errors.submit}
                  </div>
                )}
                
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`button-primary w-full md:w-auto ${
                      isSubmitting && 'opacity-75 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Joining...' : 'Join the Community ✨'}
                  </button>
                  
                  <p className="mt-4 text-teal-700/80 text-sm">
                    Join 247 others seeking to strengthen their marriages through Islamic wisdom.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;