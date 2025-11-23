"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OnboardingWizard from "../../../components/driver/onboarding-wizard";
import IdentityVerificationStep from "../../../components/driver/identity-verification-step";
import VehicleSetupStep from "../../../components/driver/vehicle-setup-step";
import BankingSetupStep from "../../../components/driver/banking-setup-step";
import ReviewStep from "../../../components/driver/review-step";

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isStepValid, setIsStepValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
            setIsStepValid(currentStep === 3); // Review step is always valid
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setIsStepValid(true); // Previous steps were already valid
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // In a real app, this would submit to backend and update the DriverProfile
        // linked to the current user.

        // Simulate submission and redirect to dashboard
        setTimeout(() => {
            router.push("/driver/dashboard");
        }, 1500);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <IdentityVerificationStep onValidChange={setIsStepValid} />;
            case 2:
                return <VehicleSetupStep onValidChange={setIsStepValid} />;
            case 3:
                return <BankingSetupStep onValidChange={setIsStepValid} />;
            case 4:
                return <ReviewStep />;
            default:
                return null;
        }
    };

    return (
        <OnboardingWizard
            currentStep={currentStep}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isValid={isStepValid}
            isSubmitting={isSubmitting}
        >
            {renderStep()}
        </OnboardingWizard>
    );
}
