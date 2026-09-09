<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityUpdate;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Support Team Personnel
        $irene = User::firstOrCreate(
            ['email' => 'irene@npontu-support.com'],
            [
                'name' => 'Irene',
                'password' => bcrypt('irene'),
            ]
        );

        $kwame = User::firstOrCreate(
            ['email' => 'kwame.owusu@npontu-support.com'],
            [
                'name' => 'Kwame Owusu',
                'password' => bcrypt('password123'),
            ]
        );

        $ama = User::firstOrCreate(
            ['email' => 'ama.mensah@npontu-support.com'],
            [
                'name' => 'Ama Mensah',
                'password' => bcrypt('password123'),
            ]
        );

        // 2. Seed Default Operational Activities
        $smsActivity = Activity::firstOrCreate(
            ['name' => 'Daily SMS count in comparison to SMScount from logs'],
            [
                'description' => 'Cross-reference SMS aggregation table records against server delivery logs for batch consistency.',
                'created_by' => $irene->id,
                'is_active' => true,
            ]
        );

        $paymentActivity = Activity::firstOrCreate(
            ['name' => 'Payment Gateway Callback'],
            [
                'description' => 'Verify pending payment callbacks with partner aggregator APIs and reconcile unsettled transactions.',
                'created_by' => $kwame->id,
                'is_active' => true,
            ]
        );

        $dbBackupActivity = Activity::firstOrCreate(
            ['name' => 'Database Backup'],
            [
                'description' => 'Confirm snapshot creation.',
                'created_by' => $ama->id,
                'is_active' => true,
            ]
        );

        $queueActivity = Activity::firstOrCreate(
            ['name' => 'Failed Jobs Inspection'],
            [
                'description' => 'Inspect Redis job queues.',
                'created_by' => $irene->id,
                'is_active' => true,
            ]
        );

        $errorLogActivity = Activity::firstOrCreate(
            ['name' => 'Application Error Log Review'],
            [
                'description' => 'Scan production log stacks.',
                'created_by' => $kwame->id,
                'is_active' => true,
            ]
        );

        // 3. Seed Sample Updates for Today to populate Daily Log & Handover
        $today = Carbon::today()->toDateString();
        $yesterday = Carbon::yesterday()->toDateString();

        // Yesterday's updates (sample history)
        ActivityUpdate::firstOrCreate(
            [
                'activity_id' => $smsActivity->id,
                'activity_date' => $yesterday,
            ],
            [
                'user_id' => $kwame->id,
                'status' => 'done',
                'remark' => 'SMS count: 18,450 sent vs 18,450 logged.',
                'created_at' => Carbon::yesterday()->setTime(9, 30),
            ]
        );

        ActivityUpdate::firstOrCreate(
            [
                'activity_id' => $dbBackupActivity->id,
                'activity_date' => $yesterday,
            ],
            [
                'user_id' => $ama->id,
                'status' => 'done',
                'remark' => 'Backups verified clean at 02:00 GMT.',
                'created_at' => Carbon::yesterday()->setTime(8, 15),
            ]
        );

        // Today's updates: a mix of Done and Pending for Handover testing
        ActivityUpdate::firstOrCreate(
            [
                'activity_id' => $smsActivity->id,
                'activity_date' => $today,
            ],
            [
                'user_id' => $irene->id,
                'status' => 'done',
                'remark' => 'Morning count: 12,380 SMS sent vs 12,380 logged.',
                'created_at' => Carbon::today()->setTime(10, 15),
            ]
        );

        ActivityUpdate::firstOrCreate(
            [
                'activity_id' => $paymentActivity->id,
                'activity_date' => $today,
            ],
            [
                'user_id' => $kwame->id,
                'status' => 'pending',
                'remark' => 'Awaiting response from Telco. Handing over to next shift.',
                'created_at' => Carbon::today()->setTime(11, 45),
            ]
        );

        ActivityUpdate::firstOrCreate(
            [
                'activity_id' => $dbBackupActivity->id,
                'activity_date' => $today,
            ],
            [
                'user_id' => $ama->id,
                'status' => 'done',
                'remark' => 'Daily automated snapshot verified successfully.',
                'created_at' => Carbon::today()->setTime(9, 0),
            ]
        );

        ActivityUpdate::firstOrCreate(
            [
                'activity_id' => $queueActivity->id,
                'activity_date' => $today,
            ],
            [
                'user_id' => $irene->id,
                'status' => 'pending',
                'remark' => '3 jobs failed in notification_retry queue due to timeout.',
                'created_at' => Carbon::today()->setTime(13, 10),
            ]
        );
    }
}
