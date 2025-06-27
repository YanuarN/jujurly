import { Shield, Zap, Users } from 'lucide-react';

function Card() {
    return (
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-indigo-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Anonim & Aman
            </h3>
            <p className="text-gray-600">
              Identitas terjaga, feedback tetap jujur tanpa khawatir
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-teal-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Feedback Instan
            </h3>
            <p className="text-gray-600">
              Langsung kirim, langsung sampai, tanpa ribet
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-purple-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Komunitas Jujur
            </h3>
            <p className="text-gray-600">
              Bangun budaya feedback yang konstruktif dan jujur
            </p>
          </div>
        </div>
    )
}

export default Card;
