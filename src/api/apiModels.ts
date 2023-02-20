/**
 * @export
 * @interface MinesweeperDto
 */
export interface MinesweeperDto {
    /**
     * @type {string}
     * @memberof MinesweeperDto
     */
    userName?: string;
    /**
     * @type {number}
     * @memberof MinesweeperDto
     */
    time?: number;
}

/**
 *
 * @export
 * @interface AuthenticationDto
 */
export interface AuthenticationDto {
    /**
     *
     * @type {string}
     * @memberof AuthenticationDTO
     */
    username?: string;
    /**
     *
     * @type {string}
     * @memberof AuthenticationDTO
     */
    password?: string;
}

/**
 *
 * @export
 * @interface AuthenticationResponseDto
 */
export interface AuthenticationResponseDto {
    /**
     *
     * @type {string}
     * @memberof AuthenticationResponseDTO
     */
    token?: string;
    /**
     *
     * @type {string}
     * @memberof AuthenticationResponseDTO
     */
    username?: string;
}

/**
 *
 * @export
 * @interface CheckTokenDto
 */
export interface CheckTokenDto {
    /**
     *
     * @type {string}
     * @memberof CheckTokenDto
     */
    token?: string;
}