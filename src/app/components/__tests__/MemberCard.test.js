import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberCard from '../MemberCard';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock FontAwesome
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, ...props }) => <span data-testid="fa-icon" {...props} />
}));

// Mock motion components
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <div>{children}</div>,
}));

describe('MemberCard Component', () => {
  const mockOnExpand = jest.fn();
  const defaultProps = {
    index: 0,
    isExpanded: false,
    onExpand: mockOnExpand,
  };

  beforeEach(() => {
    mockOnExpand.mockClear();
  });

  describe('Rendering with complete data', () => {
    const completeMember = {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '5551234567',
      company: 'Test Company',
      position: 'CEO',
      bio: 'A test bio for John Doe',
      linkedin: 'johndoe',
      instagram: 'johndoe',
      facebook: 'johndoe',
      website: 'johndoe.com',
      image: {
        asset: {
          url: 'https://example.com/image.jpg'
        }
      }
    };

    it('renders all member information correctly', () => {
      render(<MemberCard member={completeMember} {...defaultProps} />);
      
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
      expect(screen.getByText('Test Company')).toBeInTheDocument();
      expect(screen.getByText('CEO')).toBeInTheDocument();
    });

    it('displays member image when available', () => {
      render(<MemberCard member={completeMember} {...defaultProps} />);
      
      const image = screen.getByAltText('John Doe');
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('https://example.com/image.jpg');
    });

    it('shows social media icons when links are available', () => {
      render(<MemberCard member={completeMember} {...defaultProps} isExpanded={true} />);
      
      const socialIcons = screen.getAllByTestId('fa-icon');
      expect(socialIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Rendering with missing data', () => {
    it('renders with minimal required data', () => {
      const minimalMember = {
        _id: '1',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com'
      };

      render(<MemberCard member={minimalMember} {...defaultProps} />);
      
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Smith')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('shows fallback logo when no image is provided', () => {
      const memberWithoutImage = {
        _id: '1',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com'
      };

      render(<MemberCard member={memberWithoutImage} {...defaultProps} />);
      
      const fallbackImage = screen.getByAltText('BNI 360 Logo');
      expect(fallbackImage).toBeInTheDocument();
      expect(fallbackImage.src).toContain('/360logoRed.png');
    });

    it('handles missing optional fields gracefully', () => {
      const memberWithMissingFields = {
        _id: '1',
        firstName: 'Alice',
        lastName: 'Brown',
        email: 'alice@example.com'
        // Missing: phone, company, position, bio, social links
      };

      render(<MemberCard member={memberWithMissingFields} {...defaultProps} />);
      
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Brown')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      
      // Should not crash or show undefined values
      expect(screen.queryByText('undefined')).not.toBeInTheDocument();
    });
  });

  describe('Phone number formatting', () => {
    it('formats 10-digit phone numbers correctly', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '5551234567'
      };

      render(<MemberCard member={member} {...defaultProps} />);
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    });

    it('formats 11-digit phone numbers with leading 1', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '15551234567'
      };

      render(<MemberCard member={member} {...defaultProps} />);
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    });

    it('handles non-standard phone number formats', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '555-123-4567'
      };

      render(<MemberCard member={member} {...defaultProps} />);
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    });

    it('returns original phone number if format is unrecognized', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '123'
      };

      render(<MemberCard member={member} {...defaultProps} />);
      expect(screen.getByText('123')).toBeInTheDocument();
    });
  });

  describe('Social URL formatting', () => {
    it('formats LinkedIn usernames correctly', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        linkedin: 'johndoe'
      };

      render(<MemberCard member={member} {...defaultProps} isExpanded={true} />);
      
      const linkedinLink = screen.getByRole('link');
      expect(linkedinLink.href).toBe('https://linkedin.com/in/johndoe');
    });

    it('handles LinkedIn URLs with @ symbol', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        linkedin: '@johndoe'
      };

      render(<MemberCard member={member} {...defaultProps} isExpanded={true} />);
      
      const linkedinLink = screen.getByRole('link');
      expect(linkedinLink.href).toBe('https://linkedin.com/in/johndoe');
    });

    it('preserves complete URLs', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        linkedin: 'https://linkedin.com/in/johndoe'
      };

      render(<MemberCard member={member} {...defaultProps} isExpanded={true} />);
      
      const linkedinLink = screen.getByRole('link');
      expect(linkedinLink.href).toBe('https://linkedin.com/in/johndoe');
    });
  });

  describe('Expand/Collapse functionality', () => {
    const member = {
      _id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      bio: 'Test bio content'
    };

    it('calls onExpand when card is clicked', () => {
      render(<MemberCard member={member} {...defaultProps} />);
      
      const card = screen.getByText('Test').closest('.memberCard');
      fireEvent.click(card);
      
      expect(mockOnExpand).toHaveBeenCalledTimes(1);
    });

    it('calls onExpand when chevron is clicked', () => {
      render(<MemberCard member={member} {...defaultProps} />);
      
      const chevron = screen.getByText('›');
      fireEvent.click(chevron);
      
      expect(mockOnExpand).toHaveBeenCalledTimes(1);
    });

    it('shows bio and social links when expanded', () => {
      render(<MemberCard member={member} {...defaultProps} isExpanded={true} />);
      
      expect(screen.getByText('Test bio content')).toBeInTheDocument();
    });

    it('hides bio and social links when collapsed', () => {
      render(<MemberCard member={member} {...defaultProps} isExpanded={false} />);
      
      expect(screen.queryByText('Test bio content')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles null member data gracefully', () => {
      render(<MemberCard member={null} {...defaultProps} />);
      
      // Should not crash and should show fallback content
      expect(screen.getByAltText('BNI 360 Logo')).toBeInTheDocument();
    });

    it('handles undefined member data gracefully', () => {
      render(<MemberCard member={undefined} {...defaultProps} />);
      
      // Should not crash and should show fallback content
      expect(screen.getByAltText('BNI 360 Logo')).toBeInTheDocument();
    });

    it('handles empty string values', () => {
      const memberWithEmptyStrings = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '',
        company: '',
        position: '',
        bio: ''
      };

      render(<MemberCard member={memberWithEmptyStrings} {...defaultProps} />);
      
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      
      // Should not show empty strings or undefined values
      expect(screen.queryByText('undefined')).not.toBeInTheDocument();
    });

    it('handles very long text content', () => {
      const longBio = 'A'.repeat(1000);
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        bio: longBio
      };

      render(<MemberCard member={member} {...defaultProps} isExpanded={true} />);
      
      expect(screen.getByText(longBio)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for images', () => {
      const member = {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        image: {
          asset: {
            url: 'https://example.com/image.jpg'
          }
        }
      };

      render(<MemberCard member={member} {...defaultProps} />);
      
      const image = screen.getByAltText('John Doe');
      expect(image).toBeInTheDocument();
    });

    it('has proper alt text for fallback logo', () => {
      const member = {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      };

      render(<MemberCard member={member} {...defaultProps} />);
      
      const fallbackImage = screen.getByAltText('BNI 360 Logo');
      expect(fallbackImage).toBeInTheDocument();
    });

    it('has proper target and rel attributes for external links', () => {
      const member = {
        _id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        linkedin: 'johndoe'
      };

      render(<MemberCard member={member} {...defaultProps} isExpanded={true} />);
      
      const linkedinLink = screen.getByRole('link');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
}); 