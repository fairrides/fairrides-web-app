"use client";

export default function ReviewStep() {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                    Ready to Submit!
                </h3>
                <p className="text-gray-600 mb-6">
                    Your application is complete. We'll review your documents and get back to you within 24-48 hours.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-gray-900">What happens next?</h4>

                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600">1</span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">Background Check</p>
                        <p className="text-sm text-gray-600">
                            We'll process your background check through our trusted partner (typically 24 hours).
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600">2</span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">Document Verification</p>
                        <p className="text-sm text-gray-600">
                            Our team will verify your license, insurance, and registration documents.
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600">3</span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">Activation</p>
                        <p className="text-sm text-gray-600">
                            Once approved, you'll get an email and can start driving immediately!
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="font-semibold text-gray-900">Questions?</p>
                        <p className="text-sm text-gray-600 mt-1">
                            Email us at <a href="mailto:support@nycride.com" className="text-blue-600 hover:underline">support@nycride.com</a> or
                            call <a href="tel:1-800-NYC-RIDE" className="text-blue-600 hover:underline">(800) NYC-RIDE</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
