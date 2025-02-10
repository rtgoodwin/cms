<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\queue;

/**
 * QueueWithReleaseInterface defines the common interface to be implemented by queue classes that can release jobs.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 */
interface QueueWithReleaseInterface
{
    /**
     * Releases all jobs.
     */
    public function releaseAll(): void;

    /**
     * Releases a job from the queue.
     *
     * @param string $id
     */
    public function release(string $id): void;
}
