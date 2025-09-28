import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useToast } from '@/hooks/use-toast';

interface VoiceWizardProps {
  onFormUpdate: (field: string, value: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const WIZARD_STEPS = [
  {
    field: 'name',
    question: 'What is your full name?',
    prompt: 'Please tell me your full name.'
  },
  {
    field: 'location',
    question: 'Where are you located?',
    prompt: 'What city and country are you located in?'
  },
  {
    field: 'industry',
    question: 'What industry do you work in?',
    prompt: 'What industry do you specialize in? For example, technology, healthcare, finance, education, retail, or manufacturing.'
  },
  {
    field: 'profession',
    question: 'What is your profession?',
    prompt: 'What is your current profession or job title?'
  },
  {
    field: 'experience',
    question: 'How many years of experience do you have?',
    prompt: 'How many years of professional experience do you have? You can say something like 2 years, 5 years, or 10 plus years.'
  },
  {
    field: 'role',
    question: 'What is your role?',
    prompt: 'What best describes your role? Are you an entrepreneur, product owner, designer, founder, investor, or partner?'
  },
  {
    field: 'projectCategory',
    question: 'What types of projects interest you?',
    prompt: 'What types of projects are you most interested in working on? Please describe the kind of work that excites you.'
  },
  {
    field: 'lookingFor',
    question: 'Who are you looking to meet?',
    prompt: 'What types of people are you looking to connect with? Describe the kind of collaborators or partners you want to meet.'
  }
];

const VoiceWizard = ({ onFormUpdate, isOpen, onClose }: VoiceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: speechSupported } = useSpeechRecognition();
  const { isSpeaking, speak, stop: stopSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  const currentQuestion = WIZARD_STEPS[currentStep];
  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  useEffect(() => {
    if (isOpen && currentStep === 0 && ttsSupported) {
      // Welcome message
      setTimeout(() => {
        speak("Welcome to the AI Community profile wizard. I'll help you create your profile by asking a few questions. Let's get started!");
      }, 500);
    }
  }, [isOpen, speak, ttsSupported]);

  useEffect(() => {
    if (transcript && !isListening && !isProcessing) {
      handleResponse(transcript);
    }
  }, [transcript, isListening, isProcessing]);

  const handleResponse = async (response: string) => {
    if (!response.trim()) return;

    setIsProcessing(true);
    
    // Store the response
    const newResponses = {
      ...responses,
      [currentQuestion.field]: response
    };
    setResponses(newResponses);
    
    // Update the form
    onFormUpdate(currentQuestion.field, response);

    // Provide feedback
    if (ttsSupported) {
      speak("Got it, thank you!");
    }

    // Move to next step after a brief pause
    setTimeout(() => {
      if (currentStep < WIZARD_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
        resetTranscript();
        setIsProcessing(false);
        
        // Ask next question
        setTimeout(() => {
          if (ttsSupported) {
            speak(WIZARD_STEPS[currentStep + 1].prompt);
          }
        }, 1000);
      } else {
        // Wizard complete
        setIsProcessing(false);
        if (ttsSupported) {
          speak("Perfect! Your profile has been completed. You can review and submit it now.");
        }
        toast({
          title: "Voice Wizard Complete!",
          description: "Your profile has been filled out successfully.",
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }, 1500);
  };

  const handleStartListening = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    resetTranscript();
    startListening();
  };

  const handleSkipStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      resetTranscript();
      setTimeout(() => {
        if (ttsSupported) {
          speak(WIZARD_STEPS[currentStep + 1].prompt);
        }
      }, 500);
    } else {
      onClose();
    }
  };

  const handleRepeatQuestion = () => {
    if (ttsSupported) {
      speak(currentQuestion.prompt);
    }
  };

  if (!isOpen) return null;

  if (!speechSupported) {
    return (
      <Card className="fixed inset-4 z-50 max-w-2xl mx-auto my-auto">
        <CardHeader>
          <CardTitle className="text-destructive">Speech Recognition Not Supported</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your browser doesn't support speech recognition. Please use a modern browser like Chrome, Edge, or Safari.
          </p>
          <Button onClick={onClose}>Close</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Volume2 className="w-6 h-6" />
              AI Voice Wizard
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {WIZARD_STEPS.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-primary">
              {currentQuestion.question}
            </h3>
            <p className="text-muted-foreground">
              {currentQuestion.prompt}
            </p>
          </div>

          {transcript && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Your Response:</h4>
              <p className="text-foreground">{transcript}</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
              <Button
                onClick={handleStartListening}
                disabled={isListening || isProcessing || isSpeaking}
                variant={isListening ? "destructive" : "default"}
                size="lg"
                className="min-w-[120px]"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Listening...
                  </>
                ) : isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Speaking
                  </>
                )}
              </Button>

              <Button
                onClick={handleRepeatQuestion}
                variant="outline"
                disabled={isListening || isProcessing}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Repeat
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSkipStep}
                variant="ghost"
                size="sm"
                disabled={isProcessing}
              >
                Skip This Question
              </Button>
              
              {isListening && (
                <Button
                  onClick={stopListening}
                  variant="outline"
                  size="sm"
                >
                  Stop Listening
                </Button>
              )}
            </div>
          </div>

          {responses[currentQuestion.field] && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <Badge variant="secondary" className="mb-2">Completed</Badge>
              <p className="text-sm text-muted-foreground">
                {responses[currentQuestion.field]}
              </p>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center">
            {isSpeaking && (
              <div className="flex items-center justify-center gap-2">
                <Volume2 className="w-4 h-4 animate-pulse" />
                AI is speaking...
              </div>
            )}
            {isListening && (
              <div className="flex items-center justify-center gap-2">
                <Mic className="w-4 h-4 animate-pulse text-destructive" />
                Listening for your response...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceWizard;