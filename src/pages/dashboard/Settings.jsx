import React, { useState, useEffect } from 'react';
import {
    User, Mail, Lock, Save, RefreshCw, AlertCircle,
    CheckCircle, Eye, EyeOff, Shield, Bell, Monitor,
    Smartphone, Globe, Clock, Key, Trash2, Settings,
    Camera, Edit2, Download, Upload
} from 'lucide-react';

// User Service API (to be implemented later)
const userService = {
    getUserProfile: async () => {
        console.log('Fetching user profile...');
        const userProfile = JSON.parse(localStorage.getItem("user"))
console.log(userProfile)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: userProfile.name ,
                    email: userProfile.email ,
                    role: 'Administrator',
                    timezone: 'America/New_York',
                    avatar: null,
                    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
                    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    settings: {
                        emailNotifications: true,
                        smsNotifications: false,
                        alertThreshold: 'medium',
                        autoBlockThreats: true,
                        sessionTimeout: 30,
                        twoFactorAuth: false
                    }
                });
            }, 800);
        });
    },

    updateProfile: async (data) => {
        console.log('Updating profile...', data);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Profile updated successfully' });
            }, 1000);
        });
    },

    changePassword: async (currentPassword, newPassword) => {
        console.log('Changing password...');

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (currentPassword === 'wrong') {
                    reject(new Error('Current password is incorrect'));
                } else {
                    resolve({ success: true, message: 'Password changed successfully' });
                }
            }, 1000);
        });
    },

    updateSettings: async (settings) => {
        console.log('Updating settings...', settings);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Settings updated successfully' });
            }, 800);
        });
    },

    exportData: async () => {
        console.log('Exporting user data...');
        return Promise.resolve({ success: true });
    },

    deleteAccount: async () => {
        // TODO: Implement actual API call
        console.log('Deleting account...');
        return Promise.resolve({ success: true });
    }
};

const InputField = ({ icon: Icon, label, type = 'text', value,
onChange, disabled = false, error = '' }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium
text-gray-400">{label}</label>
            <div className="relative">
                <Icon className="absolute left-4 top-1/2
-translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full pl-12 pr-12 py-3
bg-slate-900/50 border ${
                        error ? 'border-red-500/50' : 'border-cyan-500/20'
                    } rounded-lg text-white placeholder-gray-500
focus:outline-none focus:border-[#6abaca] focus:ring-2
focus:ring-[#6abaca]/20 transition-all disabled:opacity-50
disabled:cursor-not-allowed`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2
-translate-y-1/2 text-gray-400 hover:text-[#6abaca] transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" />
: <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && (
                <div className="flex items-center space-x-2
text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

const ProfileSection = ({ profile, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email,
        timezone: profile.timezone
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setSuccessMessage('');
        try {
            await userService.updateProfile(formData);
            setSuccessMessage('Profile updated successfully!');
            setIsEditing(false);
            onUpdate();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: profile.name,
            email: profile.email,
            timezone: profile.timezone
        });
        setIsEditing(false);
    };

    return (
        <div className="p-6 bg-slate-900/50 backdrop-blur border
border-cyan-500/20 rounded-xl">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br
from-[#6abaca] to-cyan-400 rounded-full flex items-center
justify-center">
                            <User className="w-10 h-10 text-slate-950" />
                        </div>
                        <button className="absolute bottom-0 right-0
p-2 bg-slate-800 border border-cyan-500/30 rounded-full
hover:bg-slate-700 transition-all">
                            <Camera className="w-4 h-4 text-[#6abaca]" />
                        </button>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold
text-white">{profile.name}</h3>
                        <p className="text-gray-400">{profile.role}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Member since
{profile.createdAt.toLocaleDateString()}
                        </p>
                    </div>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-[#6abaca]/20 border
border-[#6abaca]/30 text-[#6abaca] rounded-lg hover:bg-[#6abaca]/30
transition-all flex items-center gap-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                    </button>
                )}
            </div>

            {successMessage && (
                <div className="mb-4 flex items-center space-x-2 p-3
bg-green-500/10 border border-green-500/30 rounded-lg text-green-400
text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    icon={User}
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name:
e.target.value })}
                    disabled={!isEditing}
                />
                <InputField
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email:
e.target.value })}
                    disabled={!isEditing}
                />                
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium
text-gray-400">Timezone</label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-1/2
-translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={formData.timezone}
                            onChange={(e) => setFormData({
...formData, timezone: e.target.value })}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3
bg-slate-900/50 border border-cyan-500/20 rounded-lg text-white
focus:outline-none focus:border-[#6abaca] disabled:opacity-50
disabled:cursor-not-allowed"
                        >
                            <option value="America/New_York">Eastern
Time (US & Canada)</option>
                            <option value="America/Chicago">Central
Time (US & Canada)</option>
                            <option value="America/Denver">Mountain
Time (US & Canada)</option>
                            <option
value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                            <option value="Europe/London">London</option>
                            <option value="Europe/Paris">Paris</option>
                            <option value="Asia/Tokyo">Tokyo</option>
                        </select>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="flex gap-3 mt-6 pt-6 border-t
border-cyan-500/20">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 px-6 py-3 bg-[#6abaca]
text-slate-950 rounded-lg font-semibold hover:bg-cyan-400
transition-all disabled:opacity-50 flex items-center justify-center
gap-2"
                    >
                        {isSaving ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Changes
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="px-6 py-3 bg-slate-800 border
border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-700
transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

// Security Section Component
const SecuritySection = () => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validatePassword = () => {
        const newErrors = {};

        if (!passwordData.current) {
            newErrors.current = 'Current password is required';
        }

        if (!passwordData.new) {
            newErrors.new = 'New password is required';
        } else if (passwordData.new.length < 8) {
            newErrors.new = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.new)) {
            newErrors.new = 'Password must contain uppercase, lowercase, and number';
        }

        if (passwordData.new !== passwordData.confirm) {
            newErrors.confirm = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleChangePassword = async () => {
        const newErrors = validatePassword();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSaving(true);
        setSuccessMessage('');
        try {
            await userService.changePassword(passwordData.current,
passwordData.new);
            setSuccessMessage('Password changed successfully!');
            setPasswordData({ current: '', new: '', confirm: '' });
            setIsChangingPassword(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setErrors({ current: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6 bg-slate-900/50 backdrop-blur border
border-cyan-500/20 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex
items-center gap-2">
                        <Lock className="w-5 h-5 text-[#6abaca]" />
                        Security Settings
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Manage
your password and security preferences</p>
                </div>
            </div>

            {successMessage && (
                <div className="mb-4 flex items-center space-x-2 p-3
bg-green-500/10 border border-green-500/30 rounded-lg text-green-400
text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>{successMessage}</span>
                </div>
            )}

            {!isChangingPassword ? (
                <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium
text-white">Password</div>
                                <div className="text-sm
text-gray-400">Last changed 30 days ago</div>
                            </div>
                            <button
                                onClick={() => setIsChangingPassword(true)}
                                className="px-4 py-2 bg-[#6abaca]/20
border border-[#6abaca]/30 text-[#6abaca] rounded-lg
hover:bg-[#6abaca]/30 transition-all"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium
text-white">Two-Factor Authentication</div>
                                <div className="text-sm
text-gray-400">Add an extra layer of security</div>
                            </div>
                            <button className="px-4 py-2 bg-slate-700
border border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-600
transition-all">
                                Enable
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <InputField
                        icon={Lock}
                        label="Current Password"
                        type="password"
                        value={passwordData.current}
                        onChange={(e) => {
                            setPasswordData({ ...passwordData,
current: e.target.value });
                            setErrors({ ...errors, current: '' });
                        }}
                        error={errors.current}
                    />
                    <InputField
                        icon={Key}
                        label="New Password"
                        type="password"
                        value={passwordData.new}
                        onChange={(e) => {
                            setPasswordData({ ...passwordData, new:
e.target.value });
                            setErrors({ ...errors, new: '' });
                        }}
                        error={errors.new}
                    />
                    <InputField
                        icon={Key}
                        label="Confirm New Password"
                        type="password"
                        value={passwordData.confirm}
                        onChange={(e) => {
                            setPasswordData({ ...passwordData,
confirm: e.target.value });
                            setErrors({ ...errors, confirm: '' });
                        }}
                        error={errors.confirm}
                    />

                    <div className="text-xs text-gray-400 space-y-1">
                        <p>Password must contain:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li className={passwordData.new.length >=
8 ? 'text-green-400' : ''}>At least 8 characters</li>
                            <li
className={/[A-Z]/.test(passwordData.new) ? 'text-green-400' : ''}>One
uppercase letter</li>
                            <li
className={/[a-z]/.test(passwordData.new) ? 'text-green-400' : ''}>One
lowercase letter</li>
                            <li className={/\d/.test(passwordData.new)
? 'text-green-400' : ''}>One number</li>
                        </ul>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleChangePassword}
                            disabled={isSaving}
                            className="flex-1 px-6 py-3 bg-[#6abaca]
text-slate-950 rounded-lg font-semibold hover:bg-cyan-400
transition-all disabled:opacity-50 flex items-center justify-center
gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <RefreshCw className="w-5 h-5
animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Update Password
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setIsChangingPassword(false);
                                setPasswordData({ current: '', new:
'', confirm: '' });
                                setErrors({});
                            }}
                            disabled={isSaving}
                            className="px-6 py-3 bg-slate-800 border
border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-700
transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Notifications Section Component
const NotificationsSection = ({ settings, onUpdate }) => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = async () => {
        setIsSaving(true);
        setSuccessMessage('');
        try {
            await userService.updateSettings(localSettings);
            setSuccessMessage('Settings updated successfully!');
            onUpdate();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error updating settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6 bg-slate-900/50 backdrop-blur border
border-cyan-500/20 rounded-xl">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white flex
items-center gap-2">
                    <Bell className="w-5 h-5 text-[#6abaca]" />
                    Notification Preferences
                </h3>
                <p className="text-sm text-gray-400 mt-1">Configure
how you want to be notified</p>
            </div>

            {successMessage && (
                <div className="mb-4 flex items-center space-x-2 p-3
bg-green-500/10 border border-green-500/30 rounded-lg text-green-400
text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="space-y-4 mb-6">
                <label className="flex items-center justify-between
p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800
transition-all">
                    <div>
                        <div className="font-medium text-white">Email
Notifications</div>
                        <div className="text-sm text-gray-400">Receive
alerts via email</div>
                    </div>
                    <input
                        type="checkbox"
                        checked={localSettings.emailNotifications}
                        onChange={(e) => setLocalSettings({
...localSettings, emailNotifications: e.target.checked })}
                        className="w-5 h-5 rounded border-cyan-500/20
bg-slate-900/50 text-[#6abaca] focus:ring-[#6abaca]"
                    />
                </label>

                <label className="flex items-center justify-between
p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800
transition-all">
                    <div>
                        <div className="font-medium text-white">SMS
Notifications</div>
                        <div className="text-sm text-gray-400">Receive
critical alerts via SMS</div>
                    </div>
                    <input
                        type="checkbox"
                        checked={localSettings.smsNotifications}
                        onChange={(e) => setLocalSettings({
...localSettings, smsNotifications: e.target.checked })}
                        className="w-5 h-5 rounded border-cyan-500/20
bg-slate-900/50 text-[#6abaca] focus:ring-[#6abaca]"
                    />
                </label>

                <label className="flex items-center justify-between
p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800
transition-all">
                    <div>
                        <div className="font-medium
text-white">Auto-Block Threats</div>
                        <div className="text-sm
text-gray-400">Automatically block detected threats</div>
                    </div>
                    <input
                        type="checkbox"
                        checked={localSettings.autoBlockThreats}
                        onChange={(e) => setLocalSettings({
...localSettings, autoBlockThreats: e.target.checked })}
                        className="w-5 h-5 rounded border-cyan-500/20
bg-slate-900/50 text-[#6abaca] focus:ring-[#6abaca]"
                    />
                </label>

                <div className="space-y-2">
                    <label className="block text-sm font-medium
text-gray-400">Alert Threshold</label>
                    <select
                        value={localSettings.alertThreshold}
                        onChange={(e) => setLocalSettings({
...localSettings, alertThreshold: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800
border border-cyan-500/20 rounded-lg text-white focus:outline-none
focus:border-[#6abaca]"
                    >
                        <option value="low">Low - All alerts</option>
                        <option value="medium">Medium - Medium and
above</option>
                        <option value="high">High - High and critical
only</option>
                        <option value="critical">Critical - Critical
only</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium
text-gray-400">Session Timeout (minutes)</label>
                    <select
                        value={localSettings.sessionTimeout}
                        onChange={(e) => setLocalSettings({
...localSettings, sessionTimeout: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-800
border border-cyan-500/20 rounded-lg text-white focus:outline-none
focus:border-[#6abaca]"
                    >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="240">4 hours</option>
                    </select>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full px-6 py-3 bg-[#6abaca]
text-slate-950 rounded-lg font-semibold hover:bg-cyan-400
transition-all disabled:opacity-50 flex items-center justify-center
gap-2"
            >
                {isSaving ? (
                    <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        Save Preferences
                    </>
                )}
            </button>
        </div>
    );
};

// Danger Zone Component
const DangerZoneSection = () => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleExportData = async () => {
        try {
            await userService.exportData();
            console.log('Data export initiated');
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await userService.deleteAccount();
            console.log('Account deleted');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <div className="p-6 bg-slate-900/50 backdrop-blur border
border-red-500/30 rounded-xl">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-red-400 flex
items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Danger Zone
                </h3>
                <p className="text-sm text-gray-400 mt-1">Irreversible
and destructive actions</p>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg border
border-cyan-500/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium
text-white">Export Your Data</div>
                            <div className="text-sm
text-gray-400">Download all your account data</div>
                        </div>
                        <button
                            onClick={handleExportData}
                            className="px-4 py-2 bg-slate-700 border
border-cyan-500/20 text-gray-300 rounded-lg hover:bg-slate-600
transition-all flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-red-500/10 rounded-lg border
border-red-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium
text-red-400">Delete Account</div>
                            <div className="text-sm
text-gray-400">Permanently delete your account and data</div>
                        </div>
                        {!showDeleteConfirm ? (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 bg-red-500/20
border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30
transition-all flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDeleteAccount}
                                    className="px-4 py-2 bg-red-500
text-white rounded-lg hover:bg-red-600 transition-all font-medium"
                                >
                                    Confirm Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-slate-700
text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Settings Page Component
export default function SettingsPage() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setIsLoading(true);
        try {
            const data = await userService.getUserProfile();
            setProfile(data);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 border-4
border-[#6abaca] border-t-transparent rounded-full animate-spin
mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white
mb-2">Account Settings</h1>
                <p className="text-gray-400">Manage your account
preferences and security</p>
            </div>

            {/* Profile Section */}
            <ProfileSection profile={profile} onUpdate={loadProfile} />

            {/* Security Section */}
            <SecuritySection />

            {/* Notifications Section */}
            <NotificationsSection settings={profile.settings}
onUpdate={loadProfile} />

            {/* Danger Zone */}
            <DangerZoneSection />
        </div>
    );
}