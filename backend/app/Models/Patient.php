<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Patient extends Model
{
    use Notifiable;

    protected $fillable = [
        'full_name',
        'email',
        'phone_country_code',
        'phone_number',
        'document_photo_path',
    ];

    protected $appends = ['document_photo_url'];
    protected $hidden = ['document_photo_path'];

    public function getDocumentPhotoUrlAttribute(): ?string
    {
        if (!$this->document_photo_path) {
            return null;
        }
        return url('storage/' . $this->document_photo_path);
    }

    public function routeNotificationForMail(): string
    {
        return $this->email;
    }
}
