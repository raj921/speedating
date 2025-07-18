import React, { useState, useEffect } from 'react';
import { Clock, Globe, MapPin } from 'lucide-react';

interface TimezoneConverterProps {
  eventTime: string;
  eventTimezone: string;
}

const timezones = [
  { name: 'Pacific Time', offset: -8, code: 'PST' },
  { name: 'Mountain Time', offset: -7, code: 'MST' },
  { name: 'Central Time', offset: -6, code: 'CST' },
  { name: 'Eastern Time', offset: -5, code: 'EST' },
  { name: 'London', offset: 0, code: 'GMT' },
  { name: 'Paris', offset: 1, code: 'CET' },
  { name: 'Tokyo', offset: 9, code: 'JST' },
  { name: 'Sydney', offset: 10, code: 'AEST' },
];

export default function TimezoneConverter({ eventTime, eventTimezone }: TimezoneConverterProps) {
  const [userTimezone, setUserTimezone] = useState<string>('');
  const [convertedTimes, setConvertedTimes] = useState<Array<{timezone: string, time: string, isUserTimezone: boolean}>>([]);

  useEffect(() => {
    // Detect user's timezone
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(detected);
    
    // Convert event time to different timezones
    const eventDate = new Date(`${eventTime} ${eventTimezone}`);
    
    const converted = timezones.map(tz => {
      const convertedTime = new Date(eventDate.getTime() + (tz.offset * 60 * 60 * 1000));
      return {
        timezone: `${tz.name} (${tz.code})`,
        time: convertedTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isUserTimezone: detected.includes(tz.name.toLowerCase().replace(' time', ''))
      };
    });
    
    setConvertedTimes(converted);
  }, [eventTime, eventTimezone]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold text-gray-900">Event Time Converter</h3>
      </div>
      
      <div className="space-y-3">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">Original Event Time</span>
          </div>
          <p className="text-blue-800">{eventTime} ({eventTimezone})</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {convertedTimes.map((item, index) => (
            <div 
              key={index} 
              className={`p-2 rounded border ${
                item.isUserTimezone 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.timezone}
                  {item.isUserTimezone && (
                    <span className="ml-1 text-xs text-green-600">(Your timezone)</span>
                  )}
                </span>
                <span className="text-sm font-mono text-gray-900">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 mt-3">
          <MapPin className="h-3 w-3 inline mr-1" />
          Times are automatically converted based on your location: {userTimezone}
        </div>
      </div>
    </div>
  );
}